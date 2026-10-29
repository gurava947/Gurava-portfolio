import unittest

from support import run_solution


class FirstAndLastElementsOfListTest(unittest.TestCase):
    def test_case_01_four_values(self):
        """four values."""
        result = run_solution('first-and-last-elements-of-list', '4\n1\n2\n3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 2, 3, 4]\n')

    def test_case_02_six_values(self):
        """six values."""
        result = run_solution('first-and-last-elements-of-list', '6\n5\n4\n3\n2\n1\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[5, 4, 1, 0]\n')


if __name__ == "__main__":
    unittest.main()
