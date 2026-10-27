import unittest

from support import run_solution


class AlphabetsInRightAngledTriangleTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('alphabets-in-right-angled-triangle', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '      A \n    A B \n  A B C \nA B C D \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('alphabets-in-right-angled-triangle', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '    A \n  A B \nA B C \n')


if __name__ == "__main__":
    unittest.main()
