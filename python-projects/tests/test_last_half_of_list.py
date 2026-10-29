import unittest

from support import run_solution


class LastHalfOfListTest(unittest.TestCase):
    def test_case_01_even_count(self):
        """even count."""
        result = run_solution('last-half-of-list', '4\n1 2 3 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[3, 4]\n')

    def test_case_02_odd_count(self):
        """odd count."""
        result = run_solution('last-half-of-list', '3\n7 8 9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[9]\n')


if __name__ == "__main__":
    unittest.main()
