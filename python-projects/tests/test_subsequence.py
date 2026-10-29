import unittest

from support import run_solution


class SubsequenceTest(unittest.TestCase):
    def test_case_01_ace_inside_abcdef(self):
        """ace inside abcdef."""
        result = run_solution('subsequence', 'abcdef\nace\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Yes\n')

    def test_case_02_aec_inside_abcdef(self):
        """aec inside abcdef."""
        result = run_solution('subsequence', 'abcdef\naec\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No\n')


if __name__ == "__main__":
    unittest.main()
